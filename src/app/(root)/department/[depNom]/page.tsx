import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react'

const Page = async ({params}:{ params:{depNom : string}}) => {
  const search = params?.depNom || '';
  console.log(search);
  console.log('searchParams', params);
  const Items = await getItemByCategory(search);
  console.log('Items', Items);
  return (
    <section>
    <DepItems items={Items} />
    </section>
  )
}

export default Page