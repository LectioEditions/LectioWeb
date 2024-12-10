import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react'

const Page = async ({params}:{ params:{depNom : string}}) => {
  const search = await params.depNom;

  const Items = await getItemByCategory(search);
  return (
    <section>
    <DepItems items={Items} />
    </section>
  )
}

export default Page
