import { createRegistration } from "@/gql/create_registraton";
import { textFields } from "@/utils/fields";
import { spinData } from "@/utils/spindata";
import { useState, FormEventHandler } from "react";
import { TextInput } from "./TextInput";
import { useNhostClient } from "@nhost/nextjs";
import { Wheel } from "react-custom-roulette";

const initialState = {
  form: { name: "", email: "", phone_number: "" },
  errors: {},
  modal: null,
};
type State = {
  form: Record<string, any>;
  errors: Record<string, any>;
  modal: "form" | "spinner" | null;
};
export default function Home() {
  const [state, setState] = useState<State>(initialState);
  const [isSpinning, setIsSpinning] = useState(false);
  const [newPrize, setNewPrize] = useState(0);
  const [loading, setLoading] = useState(false);
  const nhost = useNhostClient();
  const handleChange = (e: { name: string; value: string }) => {
    const errors = state.errors;

    if (e.value) {
      delete errors[e.name];
    }
    setState({
      ...state,
      form: {
        ...state.form,
        [e.name]: e.value,
      },
      errors,
    });
  };

  const handleFocus = (e: { name: string; value: string }) => {
    if (!e.value) {
      return setState({
        ...state,
        errors: { ...state.errors, [e.name]: "This field is required" },
      });
    }
  };

  const handleValidateInputs = () => {
    const errors = state.errors;
    textFields.forEach(({ name }) => {
      if (!state?.form?.[name]) {
        errors[name] = "This field is required.";
      } else {
        delete errors[name];
      }
    });
    //validate email
    if (!errors["email"]) {
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state?.form?.["email"])
        ? (errors["email"] = "Please enter a valid phone number")
        : delete errors["email"];
    }

    //validate phone_number
    if (!errors["phone_number"]) {
      !/^\+?(\d[\d-. ]?){7,15}$/.test(state?.form?.["phone_number"])
        ? (errors["phone_number"] = "Please enter a valid phone number")
        : delete errors["phone_number"];
    }

    setState({ ...state, errors });

    return Object.values(errors).length !== 0;
  };

  const handleSubmitInfo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const hasError = handleValidateInputs();
    if (hasError) return;

    setState({ ...state, modal: "spinner" });
  };

  const handleSpinClick = () => {
    if (!isSpinning) {
      const newPrize = Math.floor(Math.random() * spinData.length);
      setNewPrize(newPrize);
      setIsSpinning(true);
    }
  };

  const handleSpinningStopped = () => {
    setIsSpinning(false);
    setState({
      ...state,
      form: { ...state.form, offer_won: spinData[newPrize].option },
    });
  };

  const handleOpenModal = () => {
    setState({ ...state, modal: "form" });
  };

  const handleRegister = async () => {
    setLoading(true);
    const { data, error } = await nhost.graphql.request(
      createRegistration,
      state.form
    );

    if (error) {
      setState({ ...state, modal: null });
      alert("failed to submit registration");
      return;
    }

    alert(
      `Congratulations ${data?.insert_registrations_one?.name}!!. We wil get in touch soon.`
    );
    setLoading(false);
    resetStates();
  };

  const resetStates = () => {
    setState(initialState);
  };

  const renderInputs = () =>
    textFields.map((field, index) => (
      <TextInput
        {...field}
        value={state?.form?.[field?.name ?? ""] as string}
        onChange={handleChange}
        onFocus={handleFocus}
        key={index}
        errorMessage={state.errors?.[field?.name]}
        isError={state?.errors?.[field?.name]}
      />
    ));

  const renderForm = () => (
    <form
      className="grid grid-cols-1 gap-3 my-4 px-5"
      onSubmit={handleSubmitInfo}
    >
      {renderInputs()}
      <div className="flex gap-1 items-center">
        <button
          type="submit"
          className="w-[max-content] uppercase text-xs px-5 py-2 rounded-md bg-slate-700 hover:bg-slate-900 text-white "
        >
          {" "}
          Show spin
        </button>
      </div>
    </form>
  );

  const renderWheel = () => (
    <div className="flex flex-col mx-auto">
      <Wheel
        mustStartSpinning={isSpinning}
        prizeNumber={newPrize}
        data={spinData}
        fontSize={10}
        onStopSpinning={handleSpinningStopped}
        outerBorderWidth={1}
        outerBorderColor="white"
        radiusLineWidth={0}
      />
      <div className="flex  gap-5 px-5 my-5">
        <button
          disabled={isSpinning || loading}
          onClick={handleSpinClick}
          className="px-5 py-2 md:px-10 flex-1 bg-slate-500 hover:bg-slate-700 mx-auto  text-white rounded-md disabled:cursor-auto disabled:bg-slate-400"
        >
          {!isSpinning ? "Spin" : "Spinning..."}
        </button>
        <button
          disabled={
            !state?.form?.offer_won ||
            state?.form.offer_won === "Try again" ||
            isSpinning ||
            loading
          }
          onClick={handleRegister}
          className="px-5 py-2 md:px-10 flex-1 bg-blue-700 mx-auto  text-white rounded-md disabled:cursor-auto disabled:bg-blue-300"
        >
          {loading ? "submitting..." : "submit"}
        </button>
      </div>
    </div>
  );

  return (
    <main className="w-screen h-screen bg-gray-800 relative">
      <div className="w-[85%] h-[100%] flex justify-center items-center mx-auto">
        <button
          onClick={handleOpenModal}
          type="button"
          className="px-4 py-2 rounded-md bg-slate-100 text-slate-900 hover:bg-white"
        >
          Click to spin
        </button>
      </div>
      <div
        className={`absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-[rgba(0,0,0,0.3)]  cursor-not-allowed ${
          state.modal !== null ? "visible z-10" : "hidden z-0"
        }`}
      >
        <div className="w-[80%] md:w-[50%] xl:w-[40%] 2xl:w-[35%] bg-white rounded-sm cursor-auto">
          <header className="flex justify-between items-center p-5">
            <h4 className="uppercase  text-xs md:text-sm text-slate-900 ">
              Enter your details to spin
            </h4>
            <button
              onClick={() => setState({ ...state, modal: null })}
              className="border-slate-400 border-[1px] border-solid outline-none bg-none h-[20px] w-[20px] flex items-center justify-center rounded-full"
            >
              <span className="text-xs text-slate-800">X</span>
            </button>
          </header>
          <div className="w-full h-[1px] bg-slate-300" />
          {state.modal === "form"
            ? renderForm()
            : state.modal === "spinner"
            ? renderWheel()
            : null}
        </div>
      </div>
    </main>
  );
}
