import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Computer Science Student",
    university: "University of Technology",
    image: "/placeholder.svg",
    rating: 5,
    text: "My Uni Buddy has transformed my academic experience. The Q&A platform helped me understand complex algorithms, and the FYP Studio made project management so much easier!"
  },
  {
    name: "Dr. Mohammad Khan",
    role: "Associate Professor",
    university: "Engineering College",
    image: "/placeholder.svg",
    rating: 5,
    text: "As an educator, I appreciate how this platform facilitates meaningful interactions with students. The question-answer system allows me to help more students efficiently."
  },
  {
    name: "Ali Hassan",
    role: "Final Year Student",
    university: "Business School",
    image: "/placeholder.svg",
    rating: 5,
    text: "The digital library is incredible! I can access all the resources I need for my research. The study groups feature also helped me connect with like-minded peers."
  },
  {
    name: "Fatima Malik",
    role: "Master's Student",
    university: "Medical College",
    image: "/placeholder.svg",
    rating: 5,
    text: "The AI-powered recommendations are spot-on. The platform understands my learning style and suggests exactly what I need to improve my understanding."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="gradient-text">Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from students and teachers who are part of our educational ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary">{testimonial.university}</p>
                </div>
                <Quote className="w-6 h-6 text-primary/50" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">4.9/5 average rating from 10,000+ users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;