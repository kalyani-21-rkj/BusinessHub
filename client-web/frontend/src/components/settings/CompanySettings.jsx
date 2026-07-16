const CompanySettings = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Company Settings
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Company Name"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="GST Number"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Company Email"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded-xl p-3"
        />

        <textarea
          rows="3"
          placeholder="Company Address"
          className="w-full border rounded-xl p-3"
        />

      </div>

    </div>
  );
};

export default CompanySettings;