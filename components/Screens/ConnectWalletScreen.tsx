import { useConnect } from 'wagmi';
import Image from 'next/image';

type propType = {
    setScreenState: React.Dispatch<React.SetStateAction<number>>;
};

function ConnectWalletScreen({ setScreenState }: propType) {
    const {
        activeConnector,
        connect,
        connectors,
        error,
        isConnecting,
        pendingConnector,
    } = useConnect({
        onConnect(data) {
            console.log(data);
            setScreenState(1);
        },
    });

    return (
        <div className="w-3/5 mx-auto flex flex-col justify-center">
            <div className="text-center text-2xl font-semibold my-12 w-2/5 mx-auto">
                Connect with like-minded people from the web3 community. Chat
                one-on-one with someone who is active in the same communities as
                you, or degen with someone random.
            </div>

            <div className="text-center text-3xl font-semibold mb-4">
                Connect your wallet:
            </div>
            <div className="flex flex-col mx-auto">
                {connectors.map((x) => (
                    <div key={x.id}>
                        <button
                            disabled={!x.ready}
                            onClick={() => connect(x)}
                            className="flex flex-row"
                        >
                            <div className="mr-3">
                                <Image
                                    src={`/images/${x.id}.svg`}
                                    alt={x.name}
                                    height={32}
                                    width={32}
                                />
                            </div>
                            <div>
                                <div className="text-xl font-medium">
                                    {x.name}
                                </div>
                                <div>
                                    {isConnecting &&
                                        pendingConnector?.id === x.id &&
                                        ' (connecting)'}
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            {/* <div>{error && <div>{error.message}</div>}</div> */}
        </div>
    );
}

export default ConnectWalletScreen;
