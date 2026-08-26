import { redirect } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import {
  getExperience,
  getProjects,
  getServices,
  getSiteProfile,
  getSkills,
} from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 60;

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en");
  const dict = getDictionary(locale);

  const [profile, skills, experience, projects, services] = await Promise.all([
    getSiteProfile(),
    getSkills(),
    getExperience(),
    getProjects(),
    getServices(),
  ]);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero locale={locale} dict={dict} profile={profile} />
        <About locale={locale} dict={dict} profile={profile} />
        <Skills dict={dict} skills={skills} />
        <Experience locale={locale} dict={dict} items={experience} />
        <Projects locale={locale} dict={dict} projects={projects} />
        <Services locale={locale} dict={dict} services={services} />
        <Contact locale={locale} dict={dict} profile={profile} />
      </div>
    </main>
  );
}
