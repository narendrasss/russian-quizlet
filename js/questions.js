/*
 * Constructor for the Question object.
 */
function Question(question, answer) {
    return {
        rus: question,
        eng: answer,
        answered: false
    };
}

const database = [
    Question("он делает", "he makes"),
    Question("я думаю", "i think"),
    Question("ты думаешь", "you think"),
    Question("ты знаешь", "you know"),
    Question("кажется", "it seems"),
    Question("я читаю", "i read"),
    Question("школа", "school"),
    Question("ты читаешь", "you read"),
    Question("я иду", "i go"),
    Question("он идёт", "he goes"),
    Question("домой", "home"),
    Question("идёшь", "you go"),
    Question("он стоит", "he stands"),
    Question("я живу", "i live"),
];