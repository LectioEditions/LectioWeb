import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react'
import { Categories } from '@/src/constants';
const Page = async ({params}:{ params:{depNom : string}}) => {
  const DepNom = await params.depNom;
  const search = Categories.filter((cat) => cat.link === DepNom);
  const Items = await getItemByCategory(search[0].dep);
  return (
    <section>
    <DepItems items={Items} />
    </section>
  )
}

export default Page
