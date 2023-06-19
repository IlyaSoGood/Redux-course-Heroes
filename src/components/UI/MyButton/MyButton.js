import classNames from "classnames";

const MyButton = ({onChange, selectedFilter, filter}) => {
    const btnClass = classNames('btn', filter.class, {
        "active": selectedFilter === filter.value,
    })

    return (
        <button
            value={filter.value}
            onClick={(e) => {
                onChange(filter.value)}}
            className={btnClass}
        >
            {filter.name}
        </button>
    );
};

export default MyButton;