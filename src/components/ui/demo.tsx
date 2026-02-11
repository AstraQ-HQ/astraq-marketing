"use client";

import { Card, CardCanvas } from "@/components/ui/animated-glow-card";
import { XCard } from "@/components/ui/x-gradient-card";

const XCardDummyData = {
    link: "https://x.com/easemize",
    authorName: "EaseMise",
    authorHandle: "easemize",
    authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
    content: [
        "The Outer container with border and dots its the actual Card",
        "Wrap it around anything to have a cool card like this",
    ],
    isVerified: true,
    timestamp: "Today",
    reply: {
        authorName: "GoodGuy",
        authorHandle: "gdguy",
        authorImage:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
        content: "Its Easy to Use great to customize",
        isVerified: true,
        timestamp: "10 minutes ago",
    },
};

const DemoOne = () => {
    return (
        <div className="flex w-full min-h-screen justify-center items-center bg-black p-4">
            <Card className="w-full max-w-2xl p-6 border border-white/20 bg-black shadow-none">
                <div className="dark">
                    <XCard {...XCardDummyData} />
                </div>
            </Card>
        </div>
    );
};

export { DemoOne };
