import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
    LineReveal,
} from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useLenis } from "@/hooks/useLenis";

const services = [
    {
        number: "01",
        title: "AI Products & SaaS Development",
        description:
            "We design and build revenue‑ready AI products, SaaS platforms, and modern applications with strong technical foundations.", image:
            "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
    },
    {
        number: "02",
        title: "AI Business Systems & Internal Tool",
        description:
            "We create intelligent internal platforms, dashboards, and automation systems that streamline operations and unlock growth.", image:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    },
    {
        number: "03",
        title: "AI Integrations, Agents & Automation",
        description:
            "We build real‑world AI systems — from document intelligence to custom agents and workflows — integrated into your business.", image:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    },
    {
        number: "04",
        title: "MVP → Scalable Platform Engineering",
        description:
            "We help founders go from idea to production‑grade platform with scalable architecture and long‑term product vision.", image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
    {
        number: "05",
        title: "Product Architecture & Technical Strategy",
        description:
            "We partner with teams on system design, AI strategy, and engineering direction to reduce risk and build smarter.", image:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    },
    {
        number: "06",
        title: "Product Design, UX & Growth Enablement",
        description:
            "We design product‑focused UI/UX, brand systems, and growth‑ready experiences that support adoption, conversion, and long‑term product success.", image:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    }
];

const Services = () => {
    useLenis();

    usePageMetadata({
        title: "Services | Forrof",
        description: "Explore our comprehensive software and digital services including AI development, SaaS platforms, and product strategy.",
        keywords: "AI development, SaaS, internal tools, automation, product design",
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="min-h-screen bg-background">
            <section
                id="services-page"
                className="section-padding pt-32 pb-24 relative overflow-hidden min-h-screen"
                ref={containerRef}
                onMouseMove={handleMouseMove}
            >
                {/* Floating image that follows cursor when hovering */}
                <motion.div
                    className="fixed pointer-events-none z-50 w-64 h-80 rounded-xl overflow-hidden"
                    animate={{
                        x: mousePosition.x - 128,
                        y: mousePosition.y - 160,
                        opacity: hoveredIndex !== null ? 1 : 0,
                        scale: hoveredIndex !== null ? 1 : 0.8,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                >
                    {hoveredIndex !== null && (
                        <motion.img
                            src={services[hoveredIndex].image}
                            alt={`${services[hoveredIndex].title} service`}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2 }}
                            loading="lazy"
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </motion.div>

                <div className="max-w-[1800px] mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        className="flex items-center gap-4 mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <LineReveal className="h-px bg-border flex-1" delay={0.4} />
                        <motion.span
                            className="text-xs text-muted-foreground uppercase tracking-widest"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            Our Expertise
                        </motion.span>
                    </motion.div>

                    {/* Title Grid */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-24">
                        <div className="overflow-hidden">
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-2 font-bold leading-[0.95]"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    delay: 0.2,
                                }}
                            >
                                Services & Solutions
                            </motion.h1>
                        </div>
                        <motion.div
                            className="flex items-end"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                                Comprehensive technical solutions tailored to scale your business, from initial MVP to enterprise-grade platforms.
                            </p>
                        </motion.div>
                    </div>

                    {/* Services List with Hover Image Effect */}
                    <div className="space-y-0">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.number}
                                className="group border-t border-border cursor-pointer"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="py-8 md:py-10 flex items-start md:items-center justify-between gap-6">
                                    <div className="flex items-start md:items-center gap-6 md:gap-16 flex-1">
                                        <motion.span
                                            className="text-sm text-muted-foreground font-medium min-w-[40px]"
                                            animate={{
                                                color:
                                                    hoveredIndex === index
                                                        ? "hsl(var(--foreground))"
                                                        : "hsl(var(--muted-foreground))",
                                            }}
                                        >
                                            /{service.number}
                                        </motion.span>
                                        <div className="md:overflow-visible">
                                            <motion.h3
                                                className="text-2xl md:text-4xl lg:text-5xl font-semibold"
                                                animate={{
                                                    x: hoveredIndex === index ? 30 : 0,
                                                }}
                                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                            >
                                                {service.title}
                                            </motion.h3>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center"
                                        animate={{
                                            backgroundColor:
                                                hoveredIndex === index
                                                    ? "hsl(var(--foreground))"
                                                    : "transparent",
                                            borderColor:
                                                hoveredIndex === index
                                                    ? "hsl(var(--foreground))"
                                                    : "hsl(var(--border))",
                                            rotate: hoveredIndex === index ? 45 : 0,
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className={
                                                hoveredIndex === index
                                                    ? "text-background"
                                                    : "text-foreground"
                                            }
                                        />
                                    </motion.div>
                                </div>

                                {/* Expandable description */}
                                <motion.div
                                    className="overflow-hidden"
                                    initial={{ height: 0 }}
                                    animate={{
                                        height: hoveredIndex === index ? "auto" : 0,
                                    }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <p className="text-muted-foreground pb-8 pl-0 md:pl-[104px] max-w-2xl leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                        <motion.div
                            className="border-t border-border"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
