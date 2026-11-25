#pragma once
#include <condition_variable>
#include <memory>
#include <mutex>
#include <utility>

// One frame waiting, one owned by the renderer. Never block capture on drawing.
template<class Frame> class LatestFrameQueue {
    std::mutex mutex_;
    std::condition_variable changed_;
    std::unique_ptr<Frame> pending_;
    bool closed_ = false;
public:
    bool offer(std::unique_ptr<Frame> frame) {
        std::unique_ptr<Frame> old;
        bool replaced = false;
        {
            std::lock_guard<std::mutex> lock(mutex_);
            if (closed_) return false;
            replaced = static_cast<bool>(pending_);
            old = std::move(pending_);
            pending_ = std::move(frame);
        }
        changed_.notify_one();
        return replaced; // old is freed outside the lock.
    }
    std::unique_ptr<Frame> take() {
        std::unique_lock<std::mutex> lock(mutex_);
        changed_.wait(lock, [&] { return closed_ || pending_; });
        return closed_ ? nullptr : std::move(pending_);
    }
    void close() {
        std::unique_ptr<Frame> old;
        {
            std::lock_guard<std::mutex> lock(mutex_);
            closed_ = true;
            old = std::move(pending_);
        }
        changed_.notify_all();
    }
};
