import DialogMobile from '@/components/ui/Dialog';
import useBreakpoints, { breakpointsTailwind } from '@/lib/useBreakpoints';
import type { MarkdownHeading } from 'astro';
import { useEffect, useMemo, useRef, useState } from 'react';
import TocEntry from './TocEntry';

function useHeading(headingsInput: MarkdownHeading[]) {
  const [headings] = useState<MarkdownHeading[]>(headingsInput);
  const [isVisible, setIsVisible] = useState<boolean[]>(
    Array(headings.length).fill(false)
  );
  const headersRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastActiveIndexRef = useRef<number>(0);

  useEffect(() => {
    const headersWithUn: (HTMLElement | null)[] = headings.map((heading) =>
      document.getElementById(heading.slug)
    );
    headersRef.current = headersWithUn.filter(
      (header): header is HTMLElement => header !== null
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = headings.findIndex(
            (heading) => entry.target.id === heading.slug
          );
          if (index === -1) return;
          setIsVisible((prev) => {
            const newIsVisible = [...prev];
            newIsVisible[index] = entry.isIntersecting;
            return newIsVisible;
          });
        });
      },
      {
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    headersRef.current.forEach((header) => {
      if (header) {
        observerRef.current?.observe(header);
        header.style.scrollMarginTop = '5rem';
      }
    });

    return () => {
      headersRef.current.forEach((header) => {
        if (header) {
          observerRef.current?.unobserve(header);
        }
      });
    };
  }, [headings]);

  const activeIndex = useMemo(() => {
    const index = isVisible.findIndex((visible) => visible);
    if (index !== -1) {
      lastActiveIndexRef.current = index;
      return index;
    }
    return lastActiveIndexRef.current;
  }, [isVisible]);

  return activeIndex;
}

const Toc: React.FC<{
  label: string;
  headings: MarkdownHeading[];
}> = ({ headings, label }) => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const shouldMount = breakpoints.smaller('lg');

  const activeIndex = useHeading(headings);
  const [open, setOpen] = useState(false);

  const onClickLink = () => {
    setTimeout(() => {
      setOpen(false);
    }, 50);
  };

  if (!shouldMount) {
    return (
      <div className='bg-card shape-card p-6 sm:p-8 main-card-onload rounded-card'>
        <div className='font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative mb-2 before:w-1 before:h-4 before:rounded-md before:bg-primary before:absolute before:left-[-16px] before:top-[5.5px]'>
          <h5>{label}</h5>
        </div>
        <TocEntry
          headings={headings}
          activeIndex={activeIndex}
          onClickLink={onClickLink}
        />
      </div>
    );
  }

  return (
    <DialogMobile
      open={open}
      onOpenChange={setOpen}
      disableCloseAutoFocus
      triggerAsChild
      trigger={
        <button
          className='fixed bottom-4 right-4 z-20 animate-onload border bg-card p-2 opacity-0 animate-delay-300 shape-card dark:border-gray-600'
          onClick={() => setOpen(true)}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className='size-6 text-heading'
          >
            <g fill='none'>
              <path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
              <path
                fill='currentColor'
                d='M4.5 17.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M20 18a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zM4.5 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M20 11a1 1 0 0 1 .117 1.993L20 13H9a1 1 0 0 1-.117-1.993L9 11zM4.5 3.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M20 4a1 1 0 0 1 .117 1.993L20 6H9a1 1 0 0 1-.117-1.993L9 4z'
              />
            </g>
          </svg>
        </button>
      }
    >
      <TocEntry
        headings={headings}
        activeIndex={activeIndex}
        onClickLink={onClickLink}
      />
    </DialogMobile>
  );
};

export default Toc;
