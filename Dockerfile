# Use Node Alpine as the base image
FROM node:14-alpine

# Set the working directory to the root of the app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install the React Native CLI globally
RUN npm install -g react-native

# Install OpenJDK
RUN apk add --no-cache openjdk8

# Install Android SDK components
RUN mkdir -p /opt/android-sdk && \
    wget -q https://dl.google.com/android/repository/commandlinetools-win-10406996_latest.zip -O /tmp/sdk-tools.zip && \
    unzip -q /tmp/sdk-tools.zip -d /opt/android-sdk && \
    rm /tmp/sdk-tools.zip && \
    mv /opt/android-sdk/cmdline-tools /opt/android-sdk/latest && \
    yes | /opt/android-sdk/latest/bin/sdkmanager --licenses && \
    /opt/android-sdk/latest/bin/sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3" "emulator" && \
    /opt/android-sdk/latest/bin/sdkmanager --update

# Set up Android environment variables
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/build-tools

# Expose necessary ports for the Android emulator
EXPOSE 5555
EXPOSE 5037
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

# Copy the contents of the "app" folder into the container
COPY . .

# Start the app (android)
CMD ["react-native", "run-android"]
