import FormUpdateTodo from "../compUpdateTodo/formUpdateTodo";
import HeaderUpdateTodo from "../compUpdateTodo/headerUpdateTodo";
import WrapperUpdateTodo from "../compUpdateTodo/wrapperUpdate";

export default function UpdateTodo({ navigation, route }) {
  const { dataTodo } = route.params;
  return (
    <WrapperUpdateTodo>
      <HeaderUpdateTodo navScreen={navigation} />
      <FormUpdateTodo navScreen={navigation} dataTodo={dataTodo}/>
    </WrapperUpdateTodo>
  );
}