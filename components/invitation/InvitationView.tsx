import type { ReactNode } from "react";
import { FloralCorner, Flourish, Monogram } from "@/components/Florals";
import { Navbar } from "@/components/Navbar";
import { Countdown } from "@/components/Countdown";
import { SectionTitle } from "@/components/SectionTitle";
import { SoftPhoto } from "@/components/SoftPhoto";
import { RsvpForm } from "@/components/RsvpForm";
import { galleryPhotos, homePhotos, prenupStill } from "@/lib/photos";
import {
  littleEntourage,
  parents,
  principalSponsors,
  secondarySponsors,
  wedding,
  weddingParty,
} from "@/lib/wedding";

export function InvitationView() {
  const youtubeId = wedding.prenupYoutubeId;

  return (
    <div className="paper min-h-screen">
      <Navbar />

      <section id="home" className="relative overflow-hidden px-6 py-16 md:py-24">
        <FloralCorner className="pointer-events-none absolute top-4 right-0 w-64 opacity-90 md:w-80" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative z-10 text-center md:text-left">
            <Flourish className="mx-auto mb-8 h-10 w-48 md:mx-0" />
            <h1 className="font-serif text-5xl text-[#c4b4a4] md:text-7xl">
              {wedding.groom.displayFirst} & {wedding.bride.first}
            </h1>
            <p className="mt-5 text-xs tracking-[0.28em] text-mute uppercase">
              We are getting married {wedding.date.label}
            </p>
            <Countdown />
            <Flourish className="mx-auto mt-10 h-10 w-48 md:mx-0" />
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <FloralCorner className="pointer-events-none absolute -right-8 -bottom-6 w-56 rotate-12" />
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[999px] border-[10px] border-white shadow-[0_20px_60px_rgba(196,163,90,0.18)]">
              <SoftPhoto photo={homePhotos.hero} />
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Monogram />
          <p className="mt-8 text-xs tracking-[0.4em] text-sage uppercase">{wedding.invitation.kicker}</p>
          <h2 className="font-serif mt-3 text-4xl text-ink md:text-5xl">{wedding.invitation.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-mute italic">
            {wedding.invitation.verse}
          </p>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-ink/80">{wedding.invitation.body}</p>
          <p className="mt-8 font-serif text-2xl text-gold">{wedding.date.label}</p>
        </div>
      </section>

      <section id="couple" className="px-6 py-16">
        <SectionTitle kicker="The couple" title="Imran & Janet" />
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <PersonCard
            name={wedding.groom.full}
            role="The Groom"
            photo={homePhotos.coupleGroom}
          />
          <PersonCard
            name={wedding.bride.full}
            role="The Bride"
            photo={homePhotos.coupleBride}
          />
        </div>
      </section>

      <section id="events" className="relative mt-8">
        <div className="relative h-72 overflow-hidden md:h-80">
          <SoftPhoto photo={homePhotos.hero} className="h-full w-full" imgClassName="h-full w-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-[#3f3a33]/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <SectionTitle kicker="Join us" title="Time and Place" light />
          </div>
        </div>
        <div className="relative mx-auto -mt-24 grid max-w-4xl gap-6 px-6 pb-16 md:grid-cols-2">
          <EventCard
            photo={homePhotos.ceremony}
            title={wedding.venues.ceremony.title}
            when={wedding.date.label}
            place={wedding.venues.ceremony.place}
            city={wedding.venues.ceremony.city}
            maps={wedding.venues.ceremony.maps}
          />
          <EventCard
            photo={homePhotos.reception}
            title={wedding.venues.reception.title}
            when={wedding.date.label}
            place={wedding.venues.reception.place}
            city={wedding.venues.reception.city}
            maps={wedding.venues.reception.maps}
          />
        </div>
      </section>

      <section id="entourage" className="px-6 py-16">
        <SectionTitle kicker="With love" title="The Entourage" />
        <div className="mx-auto max-w-5xl space-y-12">
          <GroupCard title="Parents" blessing={parents.blessing}>
            <div className="grid gap-8 md:grid-cols-2">
              <NameList heading="Groom" names={[...parents.groom]} />
              <NameList heading="Bride" names={[...parents.bride]} />
            </div>
          </GroupCard>

          <GroupCard title="Principal Sponsors" blessing={principalSponsors.blessing}>
            <div className="grid gap-3 sm:grid-cols-2">
              {principalSponsors.pairs.map(([a, b]) => (
                <p key={a} className="text-sm text-ink">
                  {a} <span className="text-gold">&</span> {b}
                </p>
              ))}
            </div>
          </GroupCard>

          <div className="grid gap-6 md:grid-cols-2">
            {Object.values(secondarySponsors).map((group) => (
              <GroupCard key={group.title} title={group.title} blessing={group.blessing}>
                <NameList names={[...group.names]} />
              </GroupCard>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <GroupCard title={weddingParty.groomsmen.title} blessing={weddingParty.groomsmen.blessing}>
              <NameList names={[...weddingParty.groomsmen.names]} />
            </GroupCard>
            <GroupCard title={weddingParty.bridesmaids.title} blessing={weddingParty.bridesmaids.blessing}>
              <NameList names={[...weddingParty.bridesmaids.names]} />
            </GroupCard>
          </div>

          <GroupCard title="Little Entourage" blessing="A little blessing on our day">
            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(littleEntourage).map((group) => (
                <div key={group.title}>
                  <h4 className="font-serif text-xl text-gold">{group.title}</h4>
                  <p className="mb-2 text-xs tracking-wide text-mute italic">{group.blessing}</p>
                  <NameList names={[...group.names]} />
                </div>
              ))}
            </div>
          </GroupCard>
        </div>
      </section>

      <section id="attire" className="px-6 py-16">
        <SectionTitle kicker="Dress code" title={wedding.attire.headline} />
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#efe6d0] bg-white/80 p-8 leading-8 text-mute">
          <p>{wedding.attire.intro}</p>
          <h3 className="font-serif mt-6 text-2xl text-ink">Guests</h3>
          <p>
            <strong>Ladies:</strong> {wedding.attire.guests.ladies}
          </p>
          <p>
            <strong>Gentlemen:</strong> {wedding.attire.guests.gentlemen}
          </p>
          <p>{wedding.attire.guests.avoid}</p>
          <h3 className="font-serif mt-6 text-2xl text-ink">Principal sponsors</h3>
          <p>
            <strong>Ladies:</strong> {wedding.attire.sponsors.ladies}
          </p>
          <p>
            <strong>Gentlemen:</strong> {wedding.attire.sponsors.gentlemen}
          </p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <Note title="Adults-only celebration" body={wedding.notes.adultsOnly} />
          <Note title="Unplugged ceremony" body={wedding.notes.unplugged} />
          <Note title="After the ceremony" body={`${wedding.notes.after} ${wedding.hashtags.join(" ")}`} />
        </div>
      </section>

      <section id="gallery" className="px-6 py-20">
        <SectionTitle kicker="Memories" title="Captured Moments" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <SoftPhoto key={photo.src} photo={photo} className="aspect-[4/3] rounded-sm" />
          ))}
        </div>
      </section>

      <section id="prenup" className="px-6 py-20">
        <SectionTitle kicker="Watch" title="Our Prenup" />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_20px_60px_rgba(196,163,90,0.16)]">
          {youtubeId ? (
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title="Prenup film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video">
              <SoftPhoto photo={prenupStill} className="h-full w-full" imgClassName="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-white/45">
                <p className="font-serif text-3xl text-ink">Our prenup film is coming soon</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="rsvp" className="relative overflow-hidden px-6 py-24">
        <FloralCorner className="pointer-events-none absolute -left-10 bottom-0 w-72 rotate-180" />
        <FloralCorner className="pointer-events-none absolute -right-6 top-10 w-72" />
        <div className="relative mx-auto max-w-lg rounded-[999px] border border-[#efe6d0] bg-white/90 px-6 py-16 shadow-[0_20px_70px_rgba(196,163,90,0.12)] md:px-12">
          <SectionTitle title="Are you attending?" />
          <p className="mb-8 text-center text-sm text-mute">
            Kindly confirm on or before {wedding.rsvpDeadline}. {wedding.notes.seats}
          </p>
          <RsvpForm />
        </div>
      </section>

      <footer className="border-t border-[#efe6d0] px-6 py-12 text-center">
        <p className="font-serif text-3xl text-gold">
          {wedding.groom.displayFirst} & {wedding.bride.first}
        </p>
        <p className="mt-2 text-xs tracking-[0.3em] text-mute uppercase">{wedding.date.label}</p>
        <p className="mt-4 text-sm text-sage">{wedding.hashtags.join("  ·  ")}</p>
      </footer>
    </div>
  );
}

function PersonCard({
  name,
  role,
  photo,
}: {
  name: string;
  role: string;
  photo: (typeof homePhotos)["hero"];
}) {
  return (
    <article className="text-center">
      <div className="mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[2rem] border-[8px] border-white shadow-md">
        <SoftPhoto photo={photo} />
      </div>
      <p className="mt-5 text-xs tracking-[0.3em] text-sage uppercase">{role}</p>
      <h3 className="font-serif mt-2 text-3xl text-ink">{name}</h3>
    </article>
  );
}

function EventCard({
  photo,
  title,
  when,
  place,
  city,
  maps,
}: {
  photo: (typeof homePhotos)["ceremony"];
  title: string;
  when: string;
  place: string;
  city: string;
  maps: string;
}) {
  return (
    <article className="bg-white p-4 pb-8 text-center shadow-[0_12px_40px_rgba(63,58,51,0.08)]">
      <SoftPhoto photo={photo} className="aspect-[4/3]" />
      <h3 className="font-serif mt-6 text-2xl tracking-[0.12em] text-[#c4b4a4] uppercase">{title}</h3>
      <p className="mt-3 text-sm text-mute">{when}</p>
      <p className="mt-2 text-sm text-ink">
        {place}, {city}
      </p>
      <a href={maps} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-ink/40 text-sm">
        See Location
      </a>
    </article>
  );
}

function GroupCard({
  title,
  blessing,
  children,
}: {
  title: string;
  blessing: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[2rem] border border-[#efe6d0] bg-white/70 p-8">
      <h3 className="font-serif text-3xl text-ink">{title}</h3>
      <p className="mt-1 mb-5 text-sm text-mute italic">{blessing}</p>
      {children}
    </article>
  );
}

function NameList({ heading, names }: { heading?: string; names: string[] }) {
  return (
    <div>
      {heading ? <h4 className="mb-2 text-xs tracking-[0.25em] text-sage uppercase">{heading}</h4> : null}
      <ul className="space-y-1 text-ink">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[1.5rem] bg-white/80 p-6 shadow-sm">
      <h3 className="font-serif text-2xl text-gold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-mute">{body}</p>
    </article>
  );
}
