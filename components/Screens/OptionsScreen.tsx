type propType = {
    setScreenState: React.Dispatch<React.SetStateAction<number>>;
};

const options = [
    { name: 'Random', id: 0 },
    { name: 'Decentralland', id: 1 },
    { name: 'SuperRare', id: 2 },
];

function SelectionScreen({ setScreenState }: propType) {
    return (
        <div>
            <div>With what kind of person do you want to be matched?</div>
            {options.map((x) => (
                <div key={x.id}>{x.name}</div>
            ))}
        </div>
    );
}

export default SelectionScreen;
