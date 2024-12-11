import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CoursCard = ({
  imgURL,
  title,
  description,
  id,
}: {
  imgURL: string | undefined;
  title: string | undefined;
  description: string | undefined;
  id: number | undefined;
}) => {
  return (
    <Link className="cursor-pointer" href={`/items/${id}`} key={id}>
      <figure className="flex flex-col gap-2 items-center bg-white-6 dark:bg-black-4 py-5 rounded-xl text-white-1">
        <Image
          src={!imgURL ? '' : imgURL}
          alt={!title ? 'placeholder' : title}
          width={174}
          height={174}
          className="aspect-square rounded-xl"
        />
        <div className="flex flex-col items-center">
          <h1
            className="text-16 font-bold capitalize text-black-1 dark:text-white-1 
              max-w-[174px] truncate overflow-hidden text-ellipsis"
          >
            {title}
          </h1>
          <h2
            className="text-12 font-normal capitalize text-black-1 dark:text-white-1 
              max-w-[174px] truncate overflow-hidden text-ellipsis"
          >
            {description}
          </h2>
        </div>
      </figure>
    </Link>
  );
};

export default CoursCard;
