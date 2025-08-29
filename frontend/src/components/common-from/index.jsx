import { Button } from "../ui/button";
import FormControls from "./from-controls";

function CommonForm({
  handleSubmit,
  buttonText,
  formData = {},
  setFormData,
  formControls = [],
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className="mt-5 w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
