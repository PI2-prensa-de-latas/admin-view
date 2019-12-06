import cpf from 'cpf';
import * as Yup from 'yup';

const PromoSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),

    description: Yup.string()
        .required("Obrigatório"),

    cpf: Yup.string()
        .url("Insira um link válido")
        .required("Obrigatório")
        ,

})

export default PromoSchema;