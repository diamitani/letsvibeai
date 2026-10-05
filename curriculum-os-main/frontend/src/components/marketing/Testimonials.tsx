"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Course Creator",
    company: "TechEd Academy",
    content: "CurriculumOS reduced my curriculum design time from 2 weeks to under an hour. The multi-agent research is incredibly thorough.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Marcus Johnson",
    role: "Learning Platform Founder",
    company: "SkillPath",
    content: "The ROSTR framework architecture is production-grade. We integrated it into our platform and saw 10x faster content curation.",
    rating: 5,
    avatar: "MJ"
  },
  {
    name: "Emily Rodriguez",
    role: "Corporate Trainer",
    company: "GlobalCorp",
    content: "Finally, an AI system that actually understands learning progressions. The prerequisite mapping is spot-on.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "Prof. James Park",
    role: "University Lecturer",
    company: "MIT OpenCourseWare",
    content: "I use CurriculumOS to prototype course outlines before formal development. The source credibility tiering saves me from wading through low-quality content.",
    rating: 5,
    avatar: "JP"
  },
  {
    name: "Aisha Patel",
    role: "Bootcamp Director",
    company: "CodeCraft",
    content: "The chat interface is intuitive, but the real magic is the backend. PAL compilation and NPAO orchestration are game-changers for scaling personalized learning.",
    rating: 5,
    avatar: "AP"
  }
];

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500"
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Trusted by educators{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            See what learning professionals are saying about CurriculumOS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white font-bold`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
