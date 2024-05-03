import Input from "./form/Input";
import Button from "./form/Button";

function PersonForm({ texts, values, handles }) {
  return (
    <form>
      <h2>Add a new!</h2>
      <Input text={texts[0]} value={values[0]} handle={handles[0]} />
      <Input text={texts[1]} value={values[1]} handle={handles[1]} />
      <Button text={texts[2]} handle={handles[2]} />
    </form>
  );
}

export default PersonForm;
