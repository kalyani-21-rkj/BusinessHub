const AppearanceSettings = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Appearance Settings
      </h2>

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-medium">
            Theme
          </label>

          <select className="w-full border rounded-xl p-3">
            <option>Light</option>
            <option>Dark</option>
          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Language
          </label>

          <select className="w-full border rounded-xl p-3">
            <option>English</option>
            <option>Hindi</option>
          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Time Zone
          </label>

          <select className="w-full border rounded-xl p-3">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default AppearanceSettings;