'use client';

import React from 'react';
import { profileData } from '@/data/profile';

interface ProfileSectionProps {
  dictionary: {
    home: {
      about: {
        name: string;
        profession: string;
        bio: string;
        interests: string;
      };
      subtitle: string;
      interests: {
        digitalNomadism: string;
        aiTechnology: string;
        remoteWork: string;
        minimalism: string;
        travel: string;
      };
    };
  };
}

export default function ProfileSection({ dictionary }: ProfileSectionProps) {
  const interestKeys = [
    'digitalNomadism',
    'aiTechnology',
    'remoteWork',
    'minimalism',
    'travel'
  ] as const;

  return (
    <section className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-gray-700 dark:fill-gray-300">
                <path d="M241.2,6.8c10.4,0,20.8,0,31.2,0c1.3,0.3,2.5,0.7,3.8,0.8c54.6,4.4,103.3,23.8,144,60.4c73.3,66,101.1,148.5,79.9,244.6
    C470,449,334.6,531.8,198.6,500c-96.2-22.5-171.9-103.1-188-200.1c-1.5-9.1-2.5-18.3-3.8-27.5c0-10.4,0-20.8,0-31.2
    c0.3-1.4,0.6-2.8,0.9-4.3c2-12.8,3.2-25.8,6.1-38.5c22.2-96,103.1-171.8,199.9-187.9C222.9,9.1,232.1,8.1,241.2,6.8z M257,51.8
    C143.9,51.7,52,143.3,51.8,256.4c-0.2,113.3,91.6,205.4,204.9,205.5c113.2,0.1,205-91.5,205.2-204.7
    C462.1,143.9,370.3,51.8,257,51.8z"/>
                <path d="M133.4,118.7c0,52.5,0,103.9,0,155.3c0.4,0.1,0.7,0.3,1.1,0.4c10.3-11.8,20.6-23.6,31.5-36c9.7,22.3,19.2,44.1,28.7,65.8
    c0.4-0.1,0.8-0.2,1.2-0.2c0-1.9,0-3.8,0-5.6c0-70.3,0-140.6-0.1-210.9c0-4.6,1.3-6.4,5.7-7.7c17.9-5.2,36.1-8.3,55.1-8.4
    c0,123.7,0,247.1,0,371.6c-9.4-0.9-18.8-1.2-28-2.7c-9.7-1.6-19.3-4.5-28.9-6.7c-3.5-0.8-5.3-2.7-6.3-6.3
    c-8.3-28.2-16.9-56.3-25.5-84.5c-0.5-1.5-1.1-2.9-2-5.3c-10.1,20.5-19.8,40.1-29.5,59.7C56.3,333.4,44.8,197.9,133.4,118.7z"/>
                <path d="M378.4,275.8c-11.1-12.7-21.6-24.8-32.7-37.5c-9.7,22.2-19,43.7-28.4,65.2c-0.2-0.1-0.4-0.1-0.7-0.2c0-73.8,0-147.5,0-221.9
    c1.5,0.5,3,0.9,4.4,1.4c20.3,7.6,38.6,18.6,55.1,32.7c1.4,1.2,2.7,3.4,2.7,5.2c0.1,50.9,0.1,101.9,0.1,152.8
    C378.9,273.9,378.7,274.3,378.4,275.8z"/>
                <path d="M347.6,337.1c2.2,4.5,3.9,7.7,5.5,11c7.5,15.3,15.1,30.6,22.6,45.9c1.1,2.2,1.9,3.8-0.6,5.8c-16.7,13.6-34.9,24.2-56.2,31.8
    C328.5,400,337.9,369.1,347.6,337.1z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {profileData.name}
          </h1>

          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-3">
            {dictionary.home.about.profession}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-4">
            &quot;{dictionary.home.subtitle}&quot;
          </p>

          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              {dictionary.home.about.bio}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {dictionary.home.about.interests}:
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {interestKeys.map((key) => (
                <span
                  key={key}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 rounded-full text-sm border border-blue-200 dark:border-blue-800"
                >
                  {dictionary.home.interests[key]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
