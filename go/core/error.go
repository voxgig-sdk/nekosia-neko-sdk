package core

type NekosiaNekoError struct {
	IsNekosiaNekoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNekosiaNekoError(code string, msg string, ctx *Context) *NekosiaNekoError {
	return &NekosiaNekoError{
		IsNekosiaNekoError: true,
		Sdk:              "NekosiaNeko",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NekosiaNekoError) Error() string {
	return e.Msg
}
