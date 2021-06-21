import { StackScreenProps } from "@react-navigation/stack"
import { GlobalStore } from "lib/store/GlobalStore"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { AppleIcon, Button, EmailIcon, FacebookIcon, Flex, GoogleIcon, Spacer, Text } from "palette"
import React from "react"
import { ScrollView, View } from "react-native"
import { OnboardingNavigationStack } from "../Onboarding"

interface OnboardingCreateAccountWithProps
  extends StackScreenProps<OnboardingNavigationStack, "OnboardingCreateAccountWith"> {}

export const OnboardingCreateAccountWith: React.FC<OnboardingCreateAccountWithProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: useScreenDimensions().safeAreaInsets.top, paddingHorizontal: 20 }}
      >
        <Spacer mt={122} />
        <Text fontSize="50px">Sign Up</Text>
        <Spacer mt={60} />
        <Flex>
          <Button onPress={() => navigation.navigate("OnboardingCreateAccount")} block variant="secondaryOutline">
            <Flex flexDirection="row" alignItems="center">
              <EmailIcon></EmailIcon>
              <Text fontSize="16px">Sign up with email</Text>
            </Flex>
          </Button>
          <Spacer mt={20} />
          <Button
            onPress={() => GlobalStore.actions.auth.authFacebook({ signInOrUp: "signUp" })}
            block
            variant="secondaryOutline"
          >
            <Flex flexDirection="row" alignItems="center">
              <FacebookIcon width="25px" height="25px"></FacebookIcon>
              <Text fontSize="16px">Sign up with Facebook</Text>
            </Flex>
          </Button>
          <Spacer mt={20} />
          <Button block variant="secondaryOutline">
            <Flex flexDirection="row" alignItems="center">
              <GoogleIcon></GoogleIcon>
              <Text fontSize="16px">Sign up with Google</Text>
            </Flex>
          </Button>
          <Spacer mt={20} />
          <Button block variant="secondaryOutline">
            <Flex flexDirection="row" alignItems="center">
              <AppleIcon></AppleIcon>
              <Text fontSize="16px">Sign up with Apple</Text>
            </Flex>
          </Button>
        </Flex>
        <Flex>
          <Spacer mt={80} />
          <Text variant="small" color="black60">
            By tapping Next, Continue with Facebook or Apple, you agree to Artsy's Terms of Use and Privacy Policy
          </Text>
        </Flex>
      </ScrollView>
    </View>
  )
}
