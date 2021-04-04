import "./BillingInformation.style.css";

const BillingInformationForm = ({onSubmit}) => {

    const handleBillingInformationSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const billingInformation = {};

        for (const key of formData.keys()) {
            billingInformation[key] = formData.get(key);
        }

        onSubmit && onSubmit(billingInformation);
    }

    return (
        <form onSubmit={handleBillingInformationSubmit} id={"billingInformationForm"} className={"BillingInformationForm"}>
            <div className={"item"}>
                <label htmlFor={"name"}>
                    Ime i Prezime:
                </label>
                <input id={"name"} name={"name"} type={"text"} placeholder={"John Doe"}  required/>
            </div>
            <div className={"item"}>
                <label htmlFor={"address"}>
                    Adresa:
                </label>
                <input id={"address"} name={"address"} type={"address"} placeholder={"New York"} required/>
            </div>
            <div className={"item"}>
                <label htmlFor={"email"}>
                    Email:
                </label>
                <input id={"email"} name={"email"} type={"email"} placeholder={"johndoe@email.com"} required/>
            </div>
            <div className={"item"}>
                <label htmlFor={"phone"}>
                    Telefon:
                </label>
                <input id={"phone"} name={"phone"} type={"phone"} placeholder={"387 66 323 23 543"}  required/>
            </div>
        </form>
    )
}

export default BillingInformationForm;
