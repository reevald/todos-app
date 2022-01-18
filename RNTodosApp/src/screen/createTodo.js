import FormCreateTodo from "../compCreateTodo/formCreateTodo";
import WrapperCreateTodo from "../compCreateTodo/wrapperCreateTodo";
import HeaderCreateTodo from "../compCreateTodo/headerCreateTodo";

export default function CreateTodo({ navigation }) {
  return (
    <WrapperCreateTodo>
      <HeaderCreateTodo navScreen={navigation} />
      <FormCreateTodo navScreen={navigation}/>
    </WrapperCreateTodo>
  );
}