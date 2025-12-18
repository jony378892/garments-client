import {
  FaClipboardList,
  FaCogs,
  FaIndustry,
  FaBoxes,
  FaTruck,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaClipboardList className="text-3xl text-primary" />,
      title: "Order Management",
      description:
        "Receive and track buyer orders in one place with complete details, deadlines, and quantities for smooth planning.",
    },
    {
      icon: <FaCogs className="text-3xl text-primary" />,
      title: "Production Planning",
      description:
        "Break orders into production stages like cutting, sewing, and finishing with real-time status updates.",
    },
    {
      icon: <FaIndustry className="text-3xl text-primary" />,
      title: "Production Tracking",
      description:
        "Monitor each stage of production to identify delays early and keep workflows running efficiently.",
    },
    {
      icon: <FaBoxes className="text-3xl text-primary" />,
      title: "Inventory Monitoring",
      description:
        "Track raw materials and finished goods to avoid shortages and reduce production downtime.",
    },
    {
      icon: <FaTruck className="text-3xl text-primary" />,
      title: "On-Time Delivery",
      description:
        "Ensure timely dispatch of completed orders with clear visibility into production progress.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A simple, step-by-step workflow designed to help garment factories
            manage orders, production, and delivery with ease.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
