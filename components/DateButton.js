import Date from "./Date";

const DateButton = ({ date, onPress }) => {
    return (
        <>
            {date.map((d) => {
                return <Date key={d.id} date={d} onPress={onPress} />;
            })}
        </>
    );
};

export default DateButton;
