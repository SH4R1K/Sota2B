FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

COPY ../Sota2B.API/Sota2B.API.csproj Sota2B.API/
COPY ../Sota2B.DAL/Sota2B.DAL.csproj Sota2B.DAL/
COPY ../Sota2B.DM/Sota2B.DM.csproj Sota2B.DM/

# ��������������� �����������
WORKDIR /source/Sota2B.API
RUN dotnet restore

# �������� ���� ��� �������
WORKDIR /source
COPY ../ ./

# ������ � ����������
RUN dotnet publish Sota2B.API/Sota2B.API.csproj -c Release -o /app --no-restore

# ������� ����� ��� �������
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# �������� ��������� ���
COPY --from=build /app ./

# ������ ����������
ENTRYPOINT ["dotnet", "Sota2B.API.dll"]
