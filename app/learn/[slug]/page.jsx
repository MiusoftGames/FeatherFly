import Image from "next/image";
import { notFound } from "next/navigation";
import { learnData } from "@/lib/learnData";
import styles from "./page.module.css";

import Header from "@/components/Header/Header";
import CTA from "@/components/CTA/CTA";
import BackToTop from "@/components/BackToTop/BackToTop";
import MusicToggle from "@/components/MusicToggle/MusicToggle";
import Footer from "@/components/Footer/Footer";

export function generateStaticParams() {
    return Object.keys(learnData).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const street = learnData[slug];

    if (!street) {
        return {
            title: "Street Not Found | FeatherFly",
        };
    }

    return {
        title: `${street.name} | Explore Galle Fort | FeatherFly`,
        description: street.description,
    };
}

export default async function LearnPage({ params }) {
    const { slug } = await params;
    const street = learnData[slug];

    if (!street) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className={styles.page}>
                {/* Street Introduction */}
                <section className={styles.section}>
                    <div className={`container ${styles.layout}`}>

                        <div className={styles.imageWrap}>
                            <Image
                                src={street.image}
                                alt={`${street.name} in Galle Fort`}
                                width={700}
                                height={550}
                                className={styles.img}
                                priority
                            />
                        </div>

                        <div className={styles.content}>
                            <span className={styles.tag}>
                                {street.tag}
                            </span>

                            <h1 className={styles.title}>
                                <span className={styles.accent}>
                                    {street.accentTitle}
                                </span>{" "}
                                {street.titleEnd}
                            </h1>

                            <p className={styles.body}>
                                {street.description}
                            </p>

                            <div className={styles.factsGrid}>
                                {street.facts.map((fact) => (
                                    <div
                                        className={styles.factCard}
                                        key={fact.label}
                                    >
                                        <span className={styles.factIcon}>
                                            {fact.icon}
                                        </span>

                                        <div>
                                            <span className={styles.factLabel}>
                                                {fact.label}
                                            </span>

                                            <span className={styles.factValue}>
                                                {fact.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* History */}
                <section className={styles.historySection}>
                    <div className="container">
                        <div className={styles.historyContent}>
                            <span className={styles.tag}>
                                Discover the History
                            </span>

                            <h2 className={styles.historyTitle}>
                                About{" "}
                                <span className={styles.accent}>
                                    {street.name}
                                </span>
                            </h2>

                            <p className={styles.historyBody}>
                                {street.history}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
            <BackToTop />
        </>
    );
}