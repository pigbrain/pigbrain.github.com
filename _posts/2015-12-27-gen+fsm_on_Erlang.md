---
layout: post
category: Erlang
title: An introduction to gen_fsm behaviour
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#gen_fsm ? #  
* OTP behaviour의 한 종류이다  
* FSM(Finite State Machine)을 만드는데 사용된다  
  
<br>  
  
#FSM(Finite State Machine)#  
* 일반적인 형태
	* State(S) -> Event(E) ->  Actions(A) -> State(S')  
		* S 상태  
		* E 이벤트 발생  
		* A라는 액션을 처리  
		* S`로 상태 전환   
* gen_fsm 을 이용하여 FSM 을 만들었을때, 각 상태(State)에 대한 작성 규칙
 	
		StateName(Event, StateData) ->  
			.. code for actions here ...
			{next_state, StateName', StateData'}	
  
* 예제 (Coffee Machine)  
	1. Coffee Machine이 **대기 상태**에 있다      
	2. 동전을 넣고 Coffee 버튼을 누른다  
	3. Coffee Machine은 **생산 상태**에 놓이게 된다    
	4. Coffee가 준비되면 다시 **대기 상태**로 변경된다    
  
<br>  
  
#gen_fsm#  
* start_link/0
	* gen_fsm 실행을 위한 새로운 프로세스 생성  
	* 프로세스 등록(register)  
	* supervision tree내에서 작동되도록 할때 호출   
	* supervision tree와 별도로 동작하게 하기 위해서는 start 호출

			start_link() ->
  				gen_fsm:start_link({local, ?SERVER}, ?MODULE, [], []).  

* init/1  
	* 프로세스가 초기화 될때 호출된다 
	* 초기화에 성공할 경우 다음과 같이 리턴되어야 한다  
		* {ok, StateName , StateData}  
		* {ok, StateName, StateData, Timeout}    
		* {ok, StateName, StateData, hibernate}  
		* {stop, Reason}  
	
			* StateName : 초기 상태  
			* StateData : gen_fsm 내부에서 사용되는 데이터   
			* Timeout : 이벤트가 발생하지 않더라도 Timeout ms가 지나면 상태전환  
				* Module:StateName/2 에 의해 처리된다  
			
* StateName  
	* 각각의 상태(state)는 다음과 같은 콜백 형태들로 작성되어야 한다  
		* http://www.erlang.org/doc/man/gen_fsm.html  
		
			StateName(Event, StateData) ->  
				.. code for actions here ...  
    			{next_state, NewStateName, NewStateData}  
  

			StateName(Event, From, StateData) ->  
				.. code for actions here ...  
				{next_state, Reply, NewStateName, NewStateData}  

	* Tuple 형태로 리턴을 하되, 다음 상태에(NewStateName) 대한 명시가 되어 있어야 한다  
* 상태전환  
	* 상태(State)를 전환하기 위해서는 아래와 같은 함수를 통하여 이벤트를 발생시킨다  
		* gen_fsm:send_event/2      
		* gen_fsm:sync_send_event/2      

			
#gen_fsm 예제#  
* lock / unlock 2가지 상태를 관리  
* Code(1234) 값이 일치해야 lock <-> unlock 상태 전환 가능  

		-module(locker).
 
		-behaviour(gen_fsm).
		 
		%% API
		-export([start_link/0]).
		 
		%% gen_fsm callbacks
		-export([init/1, unlocked/2, unlocked/3,  locked/2, locked/3, handle_event/3,
		     handle_sync_event/4, handle_info/3, terminate/3, code_change/4]).
		 
		-export([lock/1, unlock/1]).
		 
		-define(SERVER, ?MODULE).
		 
		-record(state, {code}).
		 
		%%%===================================================================
		%%% API
		%%%===================================================================
		 
		%%--------------------------------------------------------------------
		%% @doc
		%% Creates a gen_fsm process which calls Module:init/1 to
		%% initialize. To ensure a synchronized start-up procedure, this
		%% function does not return until Module:init/1 has returned.
		%%
		%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
		%% @end
		%%--------------------------------------------------------------------
		start_link() ->
		    gen_fsm:start_link({local, ?SERVER}, ?MODULE, [], []).
		 
		unlock(Code) ->
		  gen_fsm:sync_send_event(?SERVER, {unlock, Code}).
		 
		lock(Code) ->
		  gen_fsm:sync_send_event(?SERVER, {lock, Code}).
		 
		%%%===================================================================
		%%% gen_fsm callbacks
		%%%===================================================================
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% Whenever a gen_fsm is started using gen_fsm:start/[3,4] or
		%% gen_fsm:start_link/[3,4], this function is called by the new
		%% process to initialize.
		%%
		%% @spec init(Args) -> {ok, StateName, State} |
		%%                     {ok, StateName, State, Timeout} |
		%%                     ignore |
		%%                     {stop, StopReason}
		%% @end
		%%--------------------------------------------------------------------
		init([]) ->
		    {ok, unlocked, #state{code=1234}}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% There should be one instance of this function for each possible
		%% state name. Whenever a gen_fsm receives an event sent using
		%% gen_fsm:send_event/2, the instance of this function with the same
		%% name as the current state name StateName is called to handle
		%% the event. It is also called if a timeout occurs.
		%%
		%% @spec state_name(Event, State) ->
		%%                   {next_state, NextStateName, NextState} |
		%%                   {next_state, NextStateName, NextState, Timeout} |
		%%                   {stop, Reason, NewState}
		%% @end
		%%--------------------------------------------------------------------
		unlocked(_Event, State) ->
		  {next_state, unlocked, State}.
		 
		locked(_Event, State) ->
		  {next_state, locked, State}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% There should be one instance of this function for each possible
		%% state name. Whenever a gen_fsm receives an event sent using
		%% gen_fsm:sync_send_event/[2,3], the instance of this function with
		%% the same name as the current state name StateName is called to
		%% handle the event.
		%%
		%% @spec state_name(Event, From, State) ->
		%%                   {next_state, NextStateName, NextState} |
		%%                   {next_state, NextStateName, NextState, Timeout} |
		%%                   {reply, Reply, NextStateName, NextState} |
		%%                   {reply, Reply, NextStateName, NextState, Timeout} |
		%%                   {stop, Reason, NewState} |
		%%                   {stop, Reason, Reply, NewState}
		%% @end
		%%--------------------------------------------------------------------
		unlocked({lock, Code}, _From, State) ->
		  case State#state.code =:= Code of
		    true ->
		      {reply, ok, locked, State};
		    false ->
		      {reply, {error, wrong_code}, unlocked, State}
		  end;
		 
		unlocked(_Event, _From, State) ->
		  Reply = {error, invalid_message},
		  {reply, Reply, unlocked, State}.
		 
		locked({unlock, Code}, _From, State) ->
		  case State#state.code =:= Code of
		    true ->
		      {reply, ok, unlocked, State};
		    false ->
		      {reply, {error, wrong_code}, locked, State}
		  end;
		 
		locked(_Event, _From, State) ->
		  Reply = {error, invalid_message},
		  {reply, Reply, locked, State}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% Whenever a gen_fsm receives an event sent using
		%% gen_fsm:send_all_state_event/2, this function is called to handle
		%% the event.
		%%
		%% @spec handle_event(Event, StateName, State) ->
		%%                   {next_state, NextStateName, NextState} |
		%%                   {next_state, NextStateName, NextState, Timeout} |
		%%                   {stop, Reason, NewState}
		%% @end
		%%--------------------------------------------------------------------
		handle_event(_Event, StateName, State) ->
		    {next_state, StateName, State}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% Whenever a gen_fsm receives an event sent using
		%% gen_fsm:sync_send_all_state_event/[2,3], this function is called
		%% to handle the event.
		%%
		%% @spec handle_sync_event(Event, From, StateName, State) ->
		%%                   {next_state, NextStateName, NextState} |
		%%                   {next_state, NextStateName, NextState, Timeout} |
		%%                   {reply, Reply, NextStateName, NextState} |
		%%                   {reply, Reply, NextStateName, NextState, Timeout} |
		%%                   {stop, Reason, NewState} |
		%%                   {stop, Reason, Reply, NewState}
		%% @end
		%%--------------------------------------------------------------------
		handle_sync_event(_Event, _From, StateName, State) ->
		    Reply = ok,
		    {reply, Reply, StateName, State}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% This function is called by a gen_fsm when it receives any
		%% message other than a synchronous or asynchronous event
		%% (or a system message).
		%%
		%% @spec handle_info(Info,StateName,State) ->
		%%                   {next_state, NextStateName, NextState} |
		%%                   {next_state, NextStateName, NextState, Timeout} |
		%%                   {stop, Reason, NewState}
		%% @end
		%%--------------------------------------------------------------------
		handle_info(_Info, StateName, State) ->
		    {next_state, StateName, State}.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% This function is called by a gen_fsm when it is about to
		%% terminate. It should be the opposite of Module:init/1 and do any
		%% necessary cleaning up. When it returns, the gen_fsm terminates with
		%% Reason. The return value is ignored.
		%%
		%% @spec terminate(Reason, StateName, State) -> void()
		%% @end
		%%--------------------------------------------------------------------
		terminate(_Reason, _StateName, _State) ->
		    ok.
		 
		%%--------------------------------------------------------------------
		%% @private
		%% @doc
		%% Convert process state when code is changed
		%%
		%% @spec code_change(OldVsn, StateName, State, Extra) ->
		%%                   {ok, StateName, NewState}
		%% @end
		%%--------------------------------------------------------------------
		code_change(_OldVsn, StateName, State, _Extra) ->
		    {ok, StateName, State}.
		 
		%%%===================================================================
		%%% Internal functions
		%%%===================================================================

<br>  
<br>  

#원문#  
* https://pdincau.wordpress.com/2010/09/07/an-introduction-to-gen_fsm-behaviour/

#참고#  
* http://www.erlang.org/doc/design_principles/fsm.html
