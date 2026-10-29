import { useSSO } from '@clerk/expo';
import { useState } from 'react';
import { Alert } from 'react-native';

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();


    const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {

        if (loadingStrategy) return;  // Guard against multiple simultaneous social auth attempts
        setLoadingStrategy(strategy);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });

            if (!createdSessionId || !setActive) {
                Alert.alert('Sign in Incomplete', 'Sign in could not be completed. Please try again');
                return;
            }
            await setActive({ session: createdSessionId });
        }
        catch (error) {
            console.log("Error during social authentication:", error);
            Alert.alert('Sign in Error', 'An error occurred during social authentication. Please try again.');
        }
        finally {
            setLoadingStrategy(null);
        }
    }

    return {
        handleSocialAuth,
        loadingStrategy
    };
}

export default useSocialAuth;