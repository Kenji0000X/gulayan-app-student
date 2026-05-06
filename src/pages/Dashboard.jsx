import { useEffect, useState } from "react";
import { FaLeaf, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import { api } from "../api";
import { toast } from "sonner";
import PlantLoading from "../components/PlantLoading";

function Dashboard() {
 
 
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stats = [
    {
      title: "Total Plants",
      value: plants.length.toString(),
      icon: FaLeaf,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Estimated Counts",
      value: plants.reduce((sum, plant) => sum + (parseInt(plant.estimated_count || plant.seedling_count || 0) || 0), 0).toLocaleString(),
      icon: FaUsers,
      color: "bg-blue-100 text-blue-600",
    }
  ];

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/plants?page=1&limit=5'); // Fetch recent 5 for dashboard
        const fetchedPlants = response.data.data || [];
        // Map fields if needed
        setPlants(fetchedPlants.map(plant => ({
          ...plant,
          estimated_count: plant.estimated_count || plant.seedling_count || '0'
        })));
      } catch (err) {
        console.error('Fetch plants error:', err);
        setError(err.message || 'Failed to fetch plants');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Plants
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Variety
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Estimated Count
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Date Planted
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <PlantLoading size="lg" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-red-500">
                    Error loading plants: {error}
                  </td>
                </tr>
              ) : plants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No plants found.
                  </td>
                </tr>
              ) : (
                plants.map((plant) => (
                  <tr
                    key={`plant-${plant.id}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {plant.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {plant.variety}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {plant.estimated_count}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {new Date(plant.date_planted).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
