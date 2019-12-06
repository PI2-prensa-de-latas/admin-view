import * as Yup from 'yup';

const PromoSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),

    description: Yup.string()
        .required("Obrigatório"),

    imgLink: Yup.string()
        .required("Obrigatório"),

})

export default PromoSchema;