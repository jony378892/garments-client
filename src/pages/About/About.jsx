export default function About() {
  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">About FabriChain</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            A smart, streamlined solution designed to help garment factories
            manage orders, production progress, and inventory with confidence.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl p-10">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            GarmentFlow is built with a single purpose: to empower small and
            medium-sized garment factories with modern technology, enabling them
            to track buyer orders, monitor each production stage, and ensure
            timely delivery without the complexity of traditional ERP systems.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">What We Do</h3>
          <p className="text-gray-600 leading-relaxed">
            The Garments Order and Production Tracker System helps factory
            owners, production managers, and merchandisers maintain full control
            over their workflow. From the moment a buyer places an order to the
            completion of finishing and delivery, every step is managed inside a
            simple and powerful dashboard.
          </p>

          <ul className="list-disc ml-6 mt-4 text-gray-600 space-y-2">
            <li>Track and manage buyer orders with real-time updates.</li>
            <li>
              Monitor production stages including cutting, sewing, finishing.
            </li>
            <li>Manage fabric and accessories inventory efficiently.</li>
            <li>Ensure on-time delivery through workflow monitoring.</li>
            <li>Reduce manual errors and improve factory productivity.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            Why We Built This
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Most small and medium-sized garment factories struggle with manual
            tracking using paper files, spreadsheets, and phone calls. These
            methods create delays, miscommunication, and production bottlenecks.
            GarmentFlow replaces these outdated practices with a complete
            digital solution that is simple, intuitive, and accessible from any
            device.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            We aim to become the most trusted digital partner for garment
            factories worldwide, transforming how production is managed and
            elevating efficiency for every team involved in the supply chain.
          </p>
        </div>
      </div>
    </div>
  );
}
