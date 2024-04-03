import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { store_id: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      store_id: params.store_id,
    },
    include: { // es como un query aninado donde hago fetch de las locations y a su vez, de la provincia, canton y distrito asociados a esa store
      locations:{
        include:{
          province:true,
          canton:true,
          district:true
        }
      }
    },
  });

  return (
    <div>
      {store ? (
        <>
          <h1>Active Store: {store.store_name}</h1>
          <h2>Store Locations:</h2>
          <ul>
            {store.locations.map((location) => (
              <li key={location.location_id}>
                <p>Address: {location.address}</p>
                <p>Province: {location.province.name}</p>
                <p>Canton: {location.canton.name}</p>
                
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
