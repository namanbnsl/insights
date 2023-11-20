import Resources from '@/components/dashboard/resources/Resources';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

async function getResources() {
  const resources = await db.resources.findMany({
    where: { classId: cookies().get('current-class')?.value }
  });

  return resources;
}

const ResourcesPage = async () => {
  const resources = await getResources();

  return (
    <div className="p-20">
      <Resources />

      <div className="mt-16">
        {resources.map((resource) => (
          <div
            className="p-4 mb-3 rounded bg-white border border-dashed w-1/3 flex flex-col cursor-pointer hover:bg-gray-100/90 transition"
            key={resource.id}
          >
            <span>{resource.name}</span>
            <span className="text-xs uppercase text-gray-500">
              Subject: {resource.subject}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
