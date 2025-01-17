import DepItems from '@/src/components/DepItems';
import { getItemByCategory } from '@/src/server/db';
import React from 'react';
import { Categories } from '@/src/constants';
import { auth } from '@clerk/nextjs/server';
import { Loader } from 'lucide-react';

const Page = async ({ params }: { params: { depNom: string } }) => {
  const { depNom } = params; // Destructuring the depNom from params

  // Authentication check
  const user = await auth();

  // Find category matching depNom
  const search = Categories.filter((cat) => cat.link === depNom);

  if (search.length === 0) {
    // Handle case where no matching category is found
    return <div>No category found for {depNom}</div>;
  }

  // Fetch items based on the category
  const Items = await getItemByCategory(search[0].dep);

  if (!Items || Items.length === 0) {
    // Handle case where no items are found
    return <div>No items available for this category.</div>;
  }

  // Sort the items by createdAt (descending order)
  const sortedItems = Items.sort((a, b) => {
    // Ensure that both items have the createdAt field, and compare
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime(); // descending order
  });

  if (!user) {
    // Show loader if no user is authenticated
    return (
      <section className="w-full">
        <Loader />
      </section>
    );
  }

  // Return the page with the sorted items
  return (
    <section>
      <DepItems items={sortedItems} />
    </section>
  );
};

export default Page;
