#include "../../app/src/main/cpp/latest_frame_queue.h"
#include <atomic>
#include <cassert>
#include <future>
#include <chrono>
#include <iostream>
struct Frame {
    static std::atomic<int> live,freed;
    int number;
    explicit Frame(int n):number(n) {++live;}
    ~Frame() {--live;++freed;}
};
std::atomic<int> Frame::live{0},Frame::freed{0};
int main() {
    using namespace std::chrono_literals;
    {
        LatestFrameQueue<Frame> queue; int replaced=0;
        for(int i=1;i<=100;++i) {
            replaced+=queue.offer(std::make_unique<Frame>(i)); assert(Frame::live==1);
        }
        assert(replaced==99 && Frame::freed==99);
        auto newest=queue.take();assert(newest->number==100);newest.reset();
        queue.close(); assert(queue.take()==nullptr);
        queue.offer(std::make_unique<Frame>(101)); assert(Frame::live==0);
    }
    {
        LatestFrameQueue<Frame> queue;queue.offer(std::make_unique<Frame>(1));
        std::promise<void> drawing,resume; auto stalled=resume.get_future();
        auto consumer=std::async(std::launch::async,[&] {
            auto first=queue.take();assert(first->number==1);
            drawing.set_value();stalled.wait();first.reset();
            auto newest=queue.take();assert(newest->number==1000);
        });
        drawing.get_future().wait();
        for(int i=2;i<=1000;++i) {queue.offer(std::make_unique<Frame>(i));assert(Frame::live<=2);}
        resume.set_value();assert(consumer.wait_for(2s)==std::future_status::ready);consumer.get();
        queue.offer(std::make_unique<Frame>(1001));queue.close();assert(Frame::live==0);
    }
    {
        LatestFrameQueue<Frame> queue;
        auto waiter=std::async(std::launch::async,[&]{return queue.take();});queue.close();
        assert(waiter.wait_for(2s)==std::future_status::ready);assert(waiter.get()==nullptr);
    }
    assert(Frame::live==0);
    std::cout<<"PASS: newest frame, bounded queue, blocked renderer, cancellation, frame lifetime\n";
}
