set WORKSPACE=..\..\..\luban_examples

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=design\MiniTemplate

dotnet %LUBAN_DLL% ^
    -t all ^
    -c typescript-json ^
    -d json  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=src\table ^
    -x outputDataDir=assets\resources\json

pause