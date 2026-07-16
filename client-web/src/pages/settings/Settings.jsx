import CompanySettings from "../../components/settings/CompanySettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <CompanySettings />

        <SecuritySettings />

      </div>

      <AppearanceSettings />

      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default Settings;