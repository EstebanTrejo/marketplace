const validate=(form)=>{
    let errors={};
    if (!form?.name || !/^(?!^\s*$)[A-Za-z0-9\s]{3,25}$/.test(form.name)) {errors.name = "El nombre debe contener de 3 a 25 caracteres";}
    if(!form?.description)errors.description ="Debe proporcionarse una descripcion de la actividad";
    // if(!form?.img?.length)errors.img="Debe subir 1 foto";
    if(!form?.price || form.price<1 || !/^[0-9]+$/.test(form.price))errors.price="Debe proporcionarse un precio valido";
    if(!form?.sizes || form.sizes.length<1)errors.sizes="Debe seleccionarse al menos 1 talle";
    if(!form?.category || form.category.length<1)errors.category="Debe seleccionarse al menos 1 categoría";
    return errors;
}
export default validate;