@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET ___MVNW_WDIR=%~dp0
@IF "%MAVEN_BASEDIR%"=="" (
  @SET MAVEN_BASEDIR=%___MVNW_WDIR%
)
@SET ___MVNW_WDIR=

@IF NOT "%MVNW_USERNAME%"=="" (
  @SET MVNW_REPOURL=
)

@SET MVNW_PROJECT_BASEDIR=%MAVEN_BASEDIR%

@SET __MVNW_WRAPPER_PROPERTIES_FILE=%MVNW_PROJECT_BASEDIR%\.mvn\wrapper\maven-wrapper.properties
@FOR /F "usebackq tokens=1,2 delims==" %%a IN ("%__MVNW_WRAPPER_PROPERTIES_FILE%") DO (
  @IF "%%a"=="distributionUrl" (SET __MVNW_DISTRIBUTION_URL=%%b)
  @IF "%%a"=="wrapperUrl" (SET __MVNW_WRAPPER_URL=%%b)
)

@SET __MVNW_MAVEN_HOME=
@FOR /F "tokens=*" %%a IN ('"%JAVA_HOME%\bin\java" -classpath "%MVNW_PROJECT_BASEDIR%\.mvn\wrapper\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %__MVNW_DISTRIBUTION_URL% 2^>NUL') DO (
  @SET __MVNW_MAVEN_HOME=%%a
)

@IF "%__MVNW_MAVEN_HOME%"=="" (
  @ECHO Could not run Maven Wrapper. Please ensure the maven-wrapper.jar is present.
  @EXIT /B 1
)

@SET M2_HOME=%__MVNW_MAVEN_HOME%
@SET MAVEN_HOME=%__MVNW_MAVEN_HOME%
@SET PATH=%__MVNW_MAVEN_HOME%\bin;%PATH%

@mvn %*
