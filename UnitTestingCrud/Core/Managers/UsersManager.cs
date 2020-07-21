﻿using Core.Contracts;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Managers
{
    public sealed class UsersManager
    {
        private readonly IUsersRepository _usersRepository;
        public UsersManager(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<IOperationResult<string>> PersistUser(User user)
        {
            try
            {
                _usersRepository.Create(new User
                {
                    Name = user.Name.ToUpper(),
                    Lastname = user.Lastname.ToUpper(),
                    Username = user.Username.ToUpper(),
                    Email = user.Email.ToLower(),
                    Password = user.Password,
                    Address = user.Address.ToUpper(),
                    Phone = user.Phone
                });

                await _usersRepository.SaveAsync();

                return BasicOperationResult<string>.Ok("Usuario creado correctamente.");
            }
            catch (Exception ex)
            {
                return BasicOperationResult<string>.Fail("Ocurrió un error registrando el usuario.", ex.ToString());
            }
        }

        public async Task<IOperationResult<User>> SearchUser(User user)
        {
            try
            {
                bool usernameExist = await _usersRepository.ExistsAsync(username => username.Username == user.Username);
                if (!usernameExist)
                {
                    return BasicOperationResult<User>.Fail("No se encontró el usuario.");
                }

                User userFound = await _usersRepository.FindAsync(dbUser => dbUser.Username == user.Username);

                return BasicOperationResult<User>.Ok(userFound);
            }
            catch (Exception ex)
            {
                return BasicOperationResult<User>.Fail("Ocurrió un error buscando al usuario.", ex.ToString());
            }
        }

        public IOperationResult<IEnumerable<User>> GetUsers()
        {
            try
            {
                IEnumerable<User> users = _usersRepository.GetUsers();

                return BasicOperationResult<IEnumerable<User>>.Ok(users);
            }
            catch (Exception ex)
            {
                return BasicOperationResult<IEnumerable<User>>.Fail("Ocurrió un error buscando al usuario.", ex.ToString());
            }
        }

        public async Task<IOperationResult<string>> UpdateUser(User user)
        {
            try
            {
                IOperationResult<User> userFound = await SearchUser(user);
                User userToUpdate = userFound.Entity;

                userToUpdate.Name = user.Name;
                userToUpdate.Lastname = user.Lastname;
                userToUpdate.Username = user.Username;
                userToUpdate.Email = user.Email;
                userToUpdate.Password = user.Password;
                userToUpdate.Address = user.Address;
                userToUpdate.Phone = user.Phone;

                await _usersRepository.SaveAsync();

                return BasicOperationResult<string>.Ok("Usuario actualizado correctamente.");
            }
            catch (Exception ex)
            {
                return BasicOperationResult<string>.Fail("Ocurrió un error actualizando al usuario.", ex.ToString());
            }
        }

        public async Task<IOperationResult<string>> DeleteUser(string username)
        {
            try
            {
                User userToDelete = await _usersRepository.FindAsync(user => user.Username == username);

                _usersRepository.Remove(userToDelete);

                await _usersRepository.SaveAsync();

                return BasicOperationResult<string>.Ok("Usuario eliminado correctamente.");
            }
            catch (Exception ex)
            {
                return BasicOperationResult<string>.Fail("Ocurrió un error eliminando el usuario.", ex.ToString());
            }
        }
    }
}
