import { useState, useEffect } from "react";
import {
  Container,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "./Button";
import {messageReturn} from "../commonStyles/messageReturn";
import SendMessageImage from "../../public/assets/img/mensagem-enviada.png";

const ContactForm = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
    const [hideMessage, setHideMessage] = useState(true);


  const handleFieldChange = (field) => (e) =>
    setFields({ ...fields, [field]: e.target.value });


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
    script.async = true;
    document.body.appendChild(script);
}, [])

  return (
    <Container maxWidth="md" sx={styles.container}>
        {hideMessage ?
      <Box>
        <p className="title-form">Insira suas informações</p>

        <form>
          <FormCtrl sx={styles.formControl}>
            <InputLabel htmlFor="name" sx={styles.nameInput}>
              Nome Completo
            </InputLabel>
            <OutlinedInput
              required
              id="name"
              label="Nome Completo"
              type="text"
              value={fields.name}
              onChange={handleFieldChange("name")}
            />
          </FormCtrl>

        <FormCtrl sx={styles.formControl}>
            <InputLabel
              htmlFor="email"
              sx={styles.mailInput}
            >
              E-mail
            </InputLabel>
            <OutlinedInput
              required
              id="email"
              label="E-mail"
              type="email"
              value={fields.email}
              onChange={handleFieldChange("email")}
            />
          </FormCtrl>

        <FormCtrl sx={styles.formControl}>
            <InputLabel htmlFor="subject" sx={styles.subjectInput}>
              Assunto
            </InputLabel>
            <OutlinedInput
              required
              id="subject"
              label="Assunto"
              type="text"
              value={fields.subject}
              onChange={handleFieldChange("subject")}
            />
          </FormCtrl>

          <FormCtrl>
            <InputLabel htmlFor="message" sx={styles.messageInput}>
              Mensagem
            </InputLabel>
            <OutlinedInput
              required
              id="message"
              label="Mensagem"
              type="text"
              value={fields.message}
              onChange={handleFieldChange("message")}
              multiline
              minRows={2}
            />
          </FormCtrl>

          <FormCtrl
            sx={{
              //css desktop
              alignItems: {
                md: "center",
              },
              mt: {
                md: "50px",
              },
            }}
          >
            <Button type="submit" sx={styles.button} onClick={() => setHideMessage(false)}>
              Enviar
            </Button>
          </FormCtrl>
        </form>
      </Box>
            :
            <Box sx={{...messageReturn, my: "5em" }}>
                <img src={SendMessageImage} alt={"mensagem enviada"} />
                <h2>Mensagem Enviada</h2>
                <span>Fique de olho em sua caixa de entrada, logo responderemos a mensagem.</span>
            </Box>
        }
    </Container>
  );
};

export default ContactForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.35rem 0;
`);

const styles = {
    container: { p: 0, input: {}, color: "#77837F", "& .title-form":{fontSize:"16px", fontWeight:"500"} },
    formControl: {
        "& .MuiOutlinedInput-input": {
            //css desktop
            padding: {
                md: "5px 14px",
            },
        },
    },
    nameInput: {
        //css desktop
        top: {md: "-9px"},
        color: "#77837F",
        fontSize: {md: "14px", xs: "1rem"},
        fontWeight: {
            md: "500",
            xs: "400",
        },
    },
    mailInput: {
        //css desktop
        top: { md: "-9px" },
        color: "#77837F",
        fontSize: { md: "14px", xs: "1rem" },
        fontWeight: {
            md: "500",
            xs: "400",
        },
        lineHeight:{md:"24px", xs:"auto"}
    },
    subjectInput: {
        //css desktop
        top: { md: "-9px" },
        color: "#77837F",
        fontSize: { md: "14px", xs: "1rem" },
        fontWeight: {
            md: "500",
            xs: "400",
        },
        lineHeight:{md:"24px", xs:"auto"}
    },
    messageInput: {
        color: "#77837F",
        fontSize: {md: "14px", xs: "1rem"},
        fontWeight: {
            md: "500",
            xs: "400",
        },
        lineHeight: {md: "24px", xs: "auto"}
    },
    button: {
        mt: {
            md: "50x",
        },
        //css desktop
        padding: {
            md: "10px 116px",
        },
    }
}
