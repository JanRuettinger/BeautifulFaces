import { useCallback, useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { sendMatchRequest } from '../../api';
import { getAccount } from '@wagmi/core';
import { useAccount } from 'wagmi';

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

    const { data: account } = useAccount();

    const [myId, setMyId] = useState<string>();
    const [friendId, setFriendId] = useState<string>();
    const [peer, setPeer] = useState<Peer>();
    const componentRef = useRef<any>({});
    const { current: my } = componentRef;

    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {
            const peer = new Peer('', {
                // host: 'localhost',
                // port: '3001',
                path: '/',
            });

            peer.on('open', (id) => {
                setMyId(id);
                setPeer(peer);
            });

            peer.on('call', (call) => {
                var getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;

                getUserMedia(
                    { video: true, audio: true },
                    (stream) => {
                        my.myVideo.srcObject = stream;
                        my.myVideo.play();

                        call.answer(stream);

                        call.on('stream', (remoteStream) => {
                            my.friendVideo.srcObject = remoteStream;
                            my.friendVideo.play();
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
        });
    }, [my.friendVideo, my.myVideo]);

    const videoCall = () => {
        // @ts-ignore
        var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        getUserMedia(
            { video: true, audio: true },
            (stream) => {
                my.myVideo.srcObject = stream;
                my.myVideo.play();

                const call = peer!.call(friendId!, stream);

                call.on('stream', (remoteStream) => {
                    my.friendVideo.srcObject = remoteStream;
                    my.friendVideo.play();
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

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
                                onClick={() => {
                                    sendMatchRequest({
                                        peerID: myId as string,
                                        walletAddress: account
                                            ? account.address!
                                            : '123',
                                        category: selectedMatchingCategory,
                                    });
                                    setSelectedMatchingCategory(x.id);
                                }}
                            >
                                {x.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <label>My ID: {myId}</label>
                <br />
                <label>Friend ID:</label>
                <input
                    className="border-2 p-2 border-black"
                    type="text"
                    value={friendId}
                    onChange={(e) => {
                        setFriendId(e.target.value);
                    }}
                />{' '}
                <br />
                <button
                    className="ml-2 border-2 border-black p-2"
                    onClick={videoCall}
                >
                    Start Video Call
                </button>
                <br />
                <br />
                <div>
                    <video ref={(ref) => (my.myVideo = ref)} />
                </div>
                <div>
                    <video ref={(ref) => (my.friendVideo = ref)} />
                </div>
            </div>
        </div>
    );
}

export default MatchingScreen;
