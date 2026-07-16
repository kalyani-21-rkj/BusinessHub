const SecuritySettings = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        Security Settings
      </h2>

      <div className="space-y-4">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl p-3"
        />

        <label className="flex items-center gap-3">

          <input type="checkbox" />

          Enable Two-Factor Authentication

        </label>

      </div>

    </div>
  );
};

export default SecuritySettings;