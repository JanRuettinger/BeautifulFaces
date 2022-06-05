import { useState } from 'react';

type propType = {
    setScreenState: React.Dispatch<React.SetStateAction<number>>;
};

const options = [
    { name: 'Random', id: 0 },
    { name: 'Decentralland', id: 1 },
    { name: 'SuperRare', id: 2 },
];

function MatchingScreen({ setScreenState }: propType) {
    const [selectedMatchingCategory, setSelectedMatchingCategory] =
        useState<number>(0);
    return (
        <div className="flex flex-row">
            <div className="w-1/5">
                <div className="flex flex-col justify-center">
                    <div className="text-center text-2xl font-semibold mb-4">
                        With what kind of person do you want to be matched?
                    </div>
                    <div className="flex flex-col mx-auto">
                        {options.map((x) => (
                            <button
                                key={x.id}
                                disabled={x.id == selectedMatchingCategory}
                                className={`${
                                    x.id == selectedMatchingCategory
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                } rounded-md border-2 border-blue-400 text-xl font-bold mt-2`}
                            >
                                {x.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <div>{/* <video ref={(ref) => (this.myVideo = ref)} /> */}</div>
                <div>
                    {/* <video ref={(ref) => (this.friendVideo = ref)} /> */}
                </div>
            </div>
        </div>
    );
}

export default MatchingScreen;
