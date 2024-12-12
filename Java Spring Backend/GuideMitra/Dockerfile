FROM maven:3.8.5-openjdk-17 AS build
COPY . . 
RUN mvn clean package -dskipTests

FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build target/GuideMitra-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
