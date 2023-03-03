<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            if (auth()->user()->type == 'admin') {
                return $next($request);
            } else {
                return response()->json([
                    'status' => 403,
                    'message' => 'Access Deneid As Your Are An Admin ! ^+^',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Please Login First ^+^',
            ]);
        }
    }
}
