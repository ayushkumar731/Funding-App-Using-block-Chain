import styled from "styled-components";
import FormLeftWrapper from "./LeftWrapper";
import FormRightWrapper from "./RightWrapper";
import { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";

const FormState = createContext();

const Form = () => {
  const [form, setForm] = useState({
    campaignTitle: "",
    story: "",
    requiredAmount: "",
    category: "education",
  });

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const imageUrl =
    "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80";

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const startCampaign = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if (form.campaignTitle === "") {
      toast.error("Title Field Is Empty");
      return;
    } else if (form.story === "") {
      toast.error("Story Field Is Empty");
      return;
    } else if (form.requiredAmount === "") {
      toast.error("Required Amount Field Is Empty");
      return;
    }
    setLoading(true);

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      CampaignFactory.abi,
      signer
    );

    const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);

    const campaignData = await contract.createCampaign(
      form.campaignTitle,
      CampaignAmount,
      imageUrl,
      form.story,
      form.category
    );

    await campaignData.wait();
      console.log(campaignData, 'campaignData')
    setAddress(campaignData.to);
  };

  return (
    <FormState.Provider
      value={{
        form,
        setForm,
        FormHandler,
        startCampaign,
      }}
    >
      <FormWrapper>
        <FormMain>
          {loading == true ? (
            address == "" ? (
              <Spinner>
                <TailSpin height={60} />
              </Spinner>
            ) : (
              <Address>
                <h1>Campagin Started Sucessfully!</h1>
                <h1>{address}</h1>
                <Button>Go To Campaign</Button>
              </Address>
            )
          ) : (
            <FormInputsWrapper>
              <FormLeftWrapper />
              <FormRightWrapper />
            </FormInputsWrapper>
          )}
        </FormMain>
      </FormWrapper>
    </FormState.Provider>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormMain = styled.div`
  width: 80%;
`;

const FormInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Address = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgSubDiv};
  border-radius: 8px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default Form;
export { FormState };
